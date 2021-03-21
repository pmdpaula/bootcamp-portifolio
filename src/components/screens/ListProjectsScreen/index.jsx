import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { PropTypes } from 'prop-types';
import _ from 'lodash';

import Box from '../../../foundation/layout/Box';
import Grid from '../../../foundation/layout/Grid';
import ProjectCard from '../../ProjectCard';
import Text from '../../../foundation/Text/index';
import Square from '../../commons/Square';
import Button from '../../commons/Button/index';

const ListProjectsScreen = ({ projectsData }) => {
  const [listedCategory, setListedCategory] = useState('all');

  const changeProjectsToShow = () => {
    if (listedCategory !== 'all') {
      return _.filter(projectsData, {
        category: listedCategory,
      });
    }

    return projectsData;
  };

  const projectsToShow = changeProjectsToShow();
  const { defaultStyles } = useContext(ThemeContext);

  const categoriesList = _.unionBy(projectsData, 'category').map(e => ({
    category: e.category,
    categoryTitle: e.categoryTitle,
  }));

  const ButtonsOfCategories = () => {
    const Buttons = categoriesList.map(e => {
      const eKey = `e_${e.category}`;
      return (
        <Button
          key={eKey}
          onClick={() => {
            setListedCategory(e.category);
          }}
          variant={listedCategory === e.category && 'secondary.main'}
          style={{ margin: '0.2em', width: '18em' }}
        >
          {e.categoryTitle}
        </Button>
      );
    });

    return Buttons;
  };

  return (
    <>
      <Box
        flex={1}
        display="flex"
        flexWrap="wrap"
        flexDirection="column"
        justifyContent="center"
        maxWidth={defaultStyles.contentWidth}
      >
        <Grid.Col
        // display="flex"
        // justifyContent="center"
        // alignItems="center"
        // value={({ sm: 12 }, { md: 8 }, { lg: 12 })}
        >
          {/* <Grid.Col> */}
          <Grid.Col
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            // maxWidth={defaultStyles.contentWidth}
          >
            <Text tag="h1" variant="title" style={{ zIndex: 100 }}>
              Segue aqui meus projetos
            </Text>

            <Square
              title="Categorias"
              value={({ sm: 11 }, { md: 10 }, { lg: 6 })}
            >
              <Button
                onClick={() => {
                  setListedCategory('all');
                }}
                variant={listedCategory === 'all' && 'secondary.main'}
                style={{ margin: '0.2em', width: '18em' }}
              >
                Todas
              </Button>

              <ButtonsOfCategories />
            </Square>
          </Grid.Col>

          <Grid.Row display="flex" justifyContent="center" alignItems="center">
            {projectsToShow.map((project, idx) => {
              const cardKey = `${project.id}_${idx}`;
              return (
                <ProjectCard
                  key={cardKey}
                  title={project.title}
                  titleback={project.card.cardTitleBack}
                  imgsrc={project.card.cardImgSrc}
                  imgalt={project.card.cardImgAlt}
                  text={project.card.cardText}
                  link={`/projects/${project.id}`}
                />
              );
            })}
          </Grid.Row>
          {/* </Box> */}
        </Grid.Col>
      </Box>
    </>
  );
};

export default ListProjectsScreen;

ListProjectsScreen.propTypes = {
  projectsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      category: PropTypes.string,
      categoryTitle: PropTypes.string,
      title: PropTypes.string,
      subTitle: PropTypes.string,
      icon: PropTypes.string,
      description: PropTypes.string,
      card: PropTypes.shape({
        cardTitleBack: PropTypes.string,
        cardImgSrc: PropTypes.string,
        cardImgAlt: PropTypes.string,
        cardText: PropTypes.string,
      }),
    }),
  ).isRequired,
};